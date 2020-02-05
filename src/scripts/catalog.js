const visibleFilterBtn = document.getElementById('filter-visible');
const hideFilterBtn = document.getElementById('button-close');
const filter = document.getElementById('filter');
const backgroundBody = document.getElementById('js-bg-body');
const filterDiscard = document.getElementById('js-filter-discard');

function findBgSize() {
  backgroundBody.style.height = `${document.body.scrollHeight}px`;
backgroundBody.style.width = `${document.body.scrollWidth}px`;
}


function visibleFilter() {
  findBgSize();
  backgroundBody.style.display = 'block';
  filter.style.display="block";
}


function hideFilter() {
  backgroundBody.style.display = 'none';
  filter.style.display="none";
}

function discardOptions(){
  const filters = filter.getElementsByTagName('input');
  filters.forEach((item)=>{
    if(item.type === 'checkbox')
      {
        item.checked = false;
      }
    else {
      item.value = ``;
    }
  });
}

visibleFilterBtn.addEventListener('click', visibleFilter);
hideFilterBtn.addEventListener('click', hideFilter);
filterDiscard.addEventListener('click', discardOptions);
window.addEventListener('resize', findBgSize);