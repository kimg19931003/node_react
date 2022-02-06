const appendCss = (CssToAppend) => {
    const css = document.createElement("link");
    css.href = CssToAppend;
    css.async = true;
    document.body.appendChild(css);
}


export default appendCss;