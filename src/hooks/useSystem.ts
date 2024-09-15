const useSystem = () => {
  const agent = navigator.userAgent.toLocaleLowerCase();

  const isMac = /macintosh|mac os x/.test(agent);
  const isWin = agent.includes('win32') || agent.includes('win64');
  return isMac ? 'mac' : isWin ? 'win' : 'mac';
};

export default useSystem;
