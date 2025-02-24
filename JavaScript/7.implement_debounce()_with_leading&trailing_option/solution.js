// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait, option = {leading: false, trailing: true}) {
  // your code here
  let timer = null;

  return function (...args) {
    let isInvoked = false;
    clearTimeout(timer);

    if (!timer && option.leading) {
      func.apply(this, args);
      isInvoked = true;
    }

    timer = setTimeout(() => {
      if (option.trailing && !isInvoked) {
        func.apply(this, args);
      }
      timer = null;
    }, wait);
  };
}
