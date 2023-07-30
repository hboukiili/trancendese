import "./GradienBox.scss"
import { useState, useEffect } from "react";
function GradienBox(props: any) {
  // const [isFullScreen, setIsFullScreen] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);
  const [vhcalc, setvhcalc] = useState((((window.innerHeight - props.vh) / window.innerHeight) * 100) + 'vh');

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight);
    };

    setPageHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    if (props.vh) {
      setvhcalc((((pageHeight - (window.innerHeight === screen.height ? (props.vh - 150) : props.vh)) / pageHeight) * 100) + 'vh');
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerHeight]);


  function pxToRem(pxValue: string): string {
    const parsedValue = parseInt(pxValue, 10);
    return `${parsedValue / 16}rem`;
  }
  var classesNames = 'container-box'
  if (props.games === true) {
    classesNames = 'container-box container-games';
  }
  return (
    <div className={classesNames} style={{ zIndex: props.zIndex, overflow: props.over === 1 ? 'hidden' : 'visible', minHeight: props.minh ? pxToRem(props.minh) : 'inherit', width: pxToRem(props.mywidth), position: props.absolute ? 'absolute' : 'relative', height: props.vh ? vhcalc : pxToRem(props.myheight), borderRadius: pxToRem(props.myborder) }}>
      <div className="main-box" style={{ borderRadius: pxToRem(props.myborder) }}>
        {props.children}
      </div>
    </div>
  )
}

export default GradienBox