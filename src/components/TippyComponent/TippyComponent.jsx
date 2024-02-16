import Tippy from '@tippyjs/react/headless';
import TippySearch from './TippySearch';

function TippyComponent({ children, resultSearch, handleHide, showResult }) {
  return (
    <Tippy
      interactive={true}
      visible={showResult && resultSearch?.data?.length > 0}
      placement="top-start"
      onClickOutside={handleHide}
      render={(attrs) => (
        <div className="box" tabIndex="-1" {...attrs} style={{ width: '512px' }}>
          <TippySearch resultSearch={resultSearch?.data}></TippySearch>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default TippyComponent;
