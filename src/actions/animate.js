
function cloneOffscreen(parent, child) {
  const clonedParent  = parent.cloneNode(true);
  const clonedChild   = child.cloneNode(true);

  clonedParent.style.cssText = getComputedStyle(parent).cssText;
  clonedParent.style.position = 'absolute';
  clonedParent.style.top = '-1000px';
  clonedParent.style.left = '-1000px';

  clonedParent.appendChild(clonedChild);
  document.body.appendChild(clonedParent);

  return {clonedParent, clonedChild};
}

function transform(node, deltaX, deltaY, options) {
  const effect = [
    'transform',
    options.duration + 'ms',
    options.easing,
    options.delay + 'ms',
  ].join(' ');
  node.style.transition = effect;
  node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

function resetTransform(node) {
  node.style.transition = null;
  node.style.transform = null;
}

function eachChild(node, fn) {
  for (let i in node.children) {
    if (node.children.hasOwnProperty(i) && i !== 'length') {
      let child = node.children[i];
      fn.call(child, child, i);
    }
  }
}


export const animateAppendChild = function(node, options={}) {

  const defaultOptions = {
    duration: 1000,
    delay: 0,
    linger: 0,
    easing: 'ease-out',
  }

  options = Object.assign({}, defaultOptions, options);

  const {clonedParent, clonedChild} = cloneOffscreen(this, node);

  const startRect   = node.getBoundingClientRect();
  const parentRect  = this.getBoundingClientRect();

  let deltaX = parentRect.left + clonedChild.offsetLeft - startRect.left;
  let deltaY = parentRect.top + clonedChild.offsetTop - startRect.top;

  transform(node, deltaX, deltaY, options);

  eachChild(this, (child, i) => {
    let childRect = child.getBoundingClientRect();
    deltaX = parentRect.left + clonedParent.children[i].offsetLeft - childRect.left;
    deltaY = parentRect.top + clonedParent.children[i].offsetTop - childRect.top;
    transform(child, deltaX, deltaY, options);
  })

  //clean up
  clonedParent.remove();

  this.clearAnimation = () => {
    options.fakeAppend || resetTransform(node);
    eachChild(this, resetTransform);
    options.fakeAppend || this.appendChild(node);
    this.clearAnimation = null;
  }

  return new Promise((resolve) => {
    setTimeout(resolve, options.duration + options.delay + options.linger)
  })

}
