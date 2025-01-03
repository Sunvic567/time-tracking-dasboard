let apiData = [];
const cardInfo = document.getElementsByClassName('action');
const timeElement = document.querySelector('#toogle-timeline');

const getWord = (className) =>{
    if (className === 'weekly'){
        return 'week';
    }
    if (className === 'monthly'){
        return 'month';
    }
    return 'day';
}


const updateDOM = (time, className) => {
    for (let card of cardInfo) {
        const cardTitle = card.firstElementChild;
        const cardTime = card.lastElementChild;
        if (cardTitle?.firstElementChild?.textContent === time.title) {
            cardTime.firstElementChild.textContent = `${time.timeframes[className].current}hrs`;
            cardTime.lastElementChild.textContent = `Last ${getWord(className)} - ${time.timeframes[className].previous}hrs`;
        }
    }
};
const populateDashboard = (timeData, className) => {
    timeData.forEach((time) => updateDOM(time, className));
};
timeElement?.addEventListener("click", (e) => {
    if(e.target.localName === 'a'){
        timeElement.querySelectorAll('a').forEach((link) => {
            link.classList.remove('active');
        });
        populateDashboard(apiData, e.target.className);
        e.target.classList.add('active');
    }
});


fetch('./data.json').then((response) => {
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}).then(data => {
    apiData = data;
    populateDashboard(data, "weekly");
}).catch((error) => console.error(error));