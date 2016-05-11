


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
    'all',
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
    if (node.children.hasOwnProperty(i)) {
      let child = node.children[i];
      fn.call(child, child, i);
    }
  }
}


export const animateAppendChild = function(node, options={}) {

  defaultOptions = {
    duration: 1000,
    delay: 0,
    easing: 'ease-in-out',
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

  const callback = () => {
    resetTransform(node);
    eachChild(this, resetTransform);
    this.appendChild(node);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      callback()
      resolve();
    }, options.duration + options.delay)
  })

}
