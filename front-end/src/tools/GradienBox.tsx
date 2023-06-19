import "./GradienBox.scss"
function GradienBox(props:any) {

  function pxToRem(pxValue: string): string {
    const parsedValue = parseInt(pxValue, 10);
    return `${parsedValue / 16}rem`;
  }
  var classesNames = 'container-box'
  if (props.games === true)
  {
    classesNames = 'container-box container-games';
  }
  return (
    <div className={props.absolute ? 'container-box container-box-absolute' : classesNames} style={{zIndex:props.zIndex, overflow: props.over === 1 ? 'hidden': 'visible' , width: pxToRem(props.mywidth),position: props.absolute ? 'absolute' : 'relative',  height: pxToRem(props.myheight), borderRadius: pxToRem(props.myborder)}}>
        <div className="main-box" style={{borderRadius: pxToRem(props.myborder)}}>
            {props.children}
        </div>
    </div>
  )
}

export default GradienBox