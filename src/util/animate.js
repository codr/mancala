
function cloneOffscreen(parent, child) {

  const clonedChild = child.cloneNode(true);
  clonedChild.animatingNode = child;

  let clonedParent;
  if (parent.animationClone) {
    clonedParent = parent.animationClone;
  } else {
    clonedParent = parent.cloneNode(true);
    parent.animationClone = clonedParent;
  }

  clonedParent.style.position = 'absolute';
  clonedParent.style.top = '-1000px';
  clonedParent.style.left = '-1000px';

  const beforeParent = clonedParent.cloneNode(true);
  parent.parentNode.appendChild(beforeParent);

  clonedParent.appendChild(clonedChild);
  parent.parentNode.appendChild(clonedParent);

  return {beforeParent, clonedParent, clonedChild};
}

function getShiftOfChild(beforeParent, afterParent, index) {
  const beforeChild = beforeParent.children[index];
  const afterChild = afterParent.children[index];
  const deltaX = afterChild.offsetLeft - beforeChild.offsetLeft;
  const deltaY = afterChild.offsetTop - beforeChild.offsetTop;
  return {deltaX, deltaY};
}

function transform(node, deltaX, deltaY, options) {
  const effect = [
    'transform',
    options.duration + 'ms',
    options.easing,
    options.delay + 'ms',
  ].join(' ');

  node.style.transition = effect;
  addTranlate(node, deltaX, deltaY);
}

function addTranlate(node, deltaX, deltaY) {
  if (deltaX === 0 && deltaY === 0) return;
  const transform = node.style.transform;
  const match = transform.match(/translate\((.*)px, (.*)px\)/)
  if (match) {
    deltaX += parseInt(match[1]);
    deltaY += parseInt(match[2]);
  }
  node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

function resetTransform(node) {
  node.style.transition = null;
  node.style.transform = null;
}

function eachChild(node, fn) {
  Array.prototype.forEach.call(node.children, fn);
}


export const animateAppendChild = function(node, options={}) {

  const defaultOptions = {
    duration: 1000,
    delay: 0,
    linger: 0,
    easing: 'ease-out',
  }
  options = Object.assign({}, defaultOptions, options);

  const {beforeParent, clonedParent, clonedChild} = cloneOffscreen(this, node);
  const startRect   = node.getBoundingClientRect();
  const parentRect  = this.getBoundingClientRect();

  // move the node to it's destination
  let deltaX = parentRect.left + clonedChild.offsetLeft - startRect.left;
  let deltaY = parentRect.top + clonedChild.offsetTop - startRect.top;
  transform(node, deltaX, deltaY, options);

  // move existing sibilings
  eachChild(this, (child, i) => {
    const {deltaX, deltaY} = getShiftOfChild(beforeParent, clonedParent, i);
    const delay = options.delay + (options.duration / 2);
    const alreadyTransformed = !!child.style.transform;
    transform(child, deltaX, deltaY, {
      ...options,
      duration: alreadyTransformed ? options.duration : options.duration/2,
      delay: alreadyTransformed ? 0 : delay,
    });
  })

  // direct animating nodes to their resting destation.
  eachChild(clonedParent, (child, i) => {
    if (child === clonedChild) return;
    if (!child.animatingNode) return;
    const {deltaX, deltaY} = getShiftOfChild(beforeParent, clonedParent, i);
    addTranlate(child.animatingNode, deltaX, deltaY);
  })

  beforeParent.remove();

  this.clearAnimation = () => {
    //clean up
    clonedParent.remove();
    delete this.animationClone;

    options.fakeAppend || resetTransform(node);
    eachChild(this, resetTransform);
    options.fakeAppend || this.appendChild(node);

    delete this.clearAnimation;
  }

  return new Promise((resolve) => {
    setTimeout(resolve, options.duration + options.delay + options.linger)
  })

}
