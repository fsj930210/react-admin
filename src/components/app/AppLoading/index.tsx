import BlockLoading from "./BlockLoading";
import BoxLoading from "./BoxLoading";
import DotLoading from "./DotLoading";

type AppLoadingProps = {
  type?: 'block' | 'box' | 'dot';
  text?: string;
}
const AppLoading = ({ type = 'block', text }: AppLoadingProps) => {
  return (
    type === 'box' ? (
      <BoxLoading text={text} />
    ) : type === 'dot' ? (
      <DotLoading text={text} />
    ) : (
      <BlockLoading text={text} />
    )
  )
}

export default AppLoading;
