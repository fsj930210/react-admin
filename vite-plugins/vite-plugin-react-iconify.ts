import { resolve } from 'node:path';

import { slash } from '@antfu/utils';
import {
  importDirectory,
  cleanupSVG,
  parseColors,
  isEmptyColor,
  runSVGO,
} from '@iconify/tools';

import type { ModuleNode, Plugin, ViteDevServer } from 'vite';

type UserConfigs = {
  dir: string;
  prefix?: string;
  provider?: string;
  monotone?: boolean;
};
type UserOptions = {
  resolver: '@iconify/react' | '@iconify/vue' | '@iconify/svelte';
  configs: UserConfigs[];
};

const VIRTUAL_MODULE_ID = 'virtual:react-iconify';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

function isPagesDir(
  path: string,
  options: UserConfigs[],
  root: string = process.cwd(),
) {
  for (const page of options) {
    const dirPath = slash(resolve(root, page.dir));
    if (path.startsWith(dirPath)) return true;
  }
  return false;
}
function isTarget(path: string, options: UserConfigs[]) {
  return isPagesDir(path, options) && /\.svg$/.test(path);
}
function invalidatePagesModule(server: ViteDevServer) {
  const { moduleGraph } = server;
  const mods = moduleGraph.getModulesByFile(VIRTUAL_MODULE_ID);
  if (mods) {
    const seen = new Set<ModuleNode>();
    mods.forEach((mod) => {
      moduleGraph.invalidateModule(mod, seen);
    });
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function onUpdate(server: ViteDevServer, options: UserOptions) {
  if (!server) return;

  invalidatePagesModule(server);
  // await createReactIconifyIcon(options);
  server.ws.send({
    type: 'full-reload',
  });
}
function setupWatcher(server: ViteDevServer, options: UserOptions) {
  const watcher = server.watcher;

  watcher.on('unlink', async (path) => {
    path = slash(path);
    if (!isTarget(path, options.configs)) return;
    onUpdate(server, options);
  });
  watcher.on('add', async (path) => {
    path = slash(path);
    if (!isTarget(path, options.configs)) return;
    onUpdate(server, options);
  });

  watcher.on('change', async (path) => {
    path = slash(path);
    if (!isTarget(path, options.configs)) return;
    onUpdate(server, options);
  });
}

async function createReactIconifyIcon(options: UserOptions) {
  let bundle = "import { addCollection } from '" + options.resolver + "';\n\n";

  for (const option of options.configs) {
    option.prefix = option.prefix || 'my-icon';
    // 导入图标
    const iconSet = await importDirectory(option.dir, {
      prefix: option.prefix,
    });
    // 验证，清理，修复颜色并优化
    await iconSet.forEach(async (name, type) => {
      if (type !== 'icon') return;
      // 获取SVG实例以进行分析
      const svg = iconSet.toSVG(name);
      if (!svg) {
        // 无效的图标
        iconSet.remove(name);
        return;
      }
      try {
        // Clean up icon code
        await cleanupSVG(svg);
        if (option.monotone) {
          // Replace color with currentColor, add if missing
          // If icon is not monotone, remove this code
          await parseColors(svg, {
            defaultColor: 'currentColor',
            callback: (attr, colorStr, color) => {
              return !color || isEmptyColor(color) ? colorStr : 'currentColor';
            },
          });
        }
        // Optimise
        await runSVGO(svg);
      } catch (err) {
        // Invalid icon
        console.error(`Error parsing ${name} from ${option.dir}:`, err);
        iconSet.remove(name);
        return;
      }
      // Update icon from SVG instance
      iconSet.fromSVG(name, svg);
    });
    // Export to JSON
    const content = iconSet.export();
    bundle += 'addCollection(' + JSON.stringify(content) + ');\n';
    return bundle;
  }
}
function reactIconifyPlugin(userOptions: UserOptions): Plugin {
  return {
    name: 'vite-plugin-react-inconify',
    enforce: 'pre',
    configResolved() {
      if (
        !userOptions ||
        !userOptions.resolver ||
        userOptions.configs?.length <= 0
      ) {
        throw Error('Please configure correctly.');
      }
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const iconSet = await createReactIconifyIcon(userOptions);
        return iconSet;
      }
    },
    configureServer(server) {
      setupWatcher(server, userOptions);
    },
  };
}

export default reactIconifyPlugin;
