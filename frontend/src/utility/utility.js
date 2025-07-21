function debounce(fn, delay) {
  let timer;
  return (...args) => {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args){
    const now = Date.now();
    if(now - lastTime >= interval){
      lastTime = now;
      fn(...args);
    }
  }
}

export {debounce, throttle}