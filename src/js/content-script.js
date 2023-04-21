chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg === 'toggle') {
    toggle();
  }
});

var iframe = document.createElement('iframe');
iframe.style.background = 'green';
iframe.style.height = '100%';
iframe.style.width = '0px';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.right = '0px';
iframe.style.zIndex = '9000000000000000000';
iframe.frameBorder = 'none';
iframe.src = chrome.extension.getURL('newtab.html');

document.body.appendChild(iframe);

function toggle() {
  if (iframe.style.width === '0px') {
    iframe.style.width = '400px';
  } else {
    iframe.style.width = '0px';
  }
}

//////////////////////////////////////////////////////
// let barWidth = 100;

// // Make sidebar
// let div = document.createElement('div');
// div.style.position = 'fixed';
// div.style.left = '0';
// div.style.top = '0';
// div.style.width = `${barWidth}px`;
// div.style.height = '100vh';
// div.style.zIndex = '9999';
// div.style.backgroundColor = 'white';
// div.style.color = 'black';

// div.innerHTML = '<p>This is a sidebar</p>';

// // Float the current page to right
// document.querySelector('body').style.marginLeft = `${barWidth}px`;
// document.querySelector('body').style.maxWidth = `calc(100vw - ${barWidth}px)`;
// document.querySelector('body').style.position = 'absolute';

// // Inject to current page
// document.querySelector('body').prepend(div);
