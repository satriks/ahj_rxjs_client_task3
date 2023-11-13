export default class StatsWidget {
    constructor(projects) {
        this.statsWidget = null
        this.createDom(projects)
    }

    createDom(projects){
        const statsWrapper = document.createElement('div');
        statsWrapper.classList.add('stats__wrapper');

        const statsTitle = document.createElement('label');
        statsTitle.textContent = 'Stats';

        const statsHeader = document.createElement('div');
        statsHeader.classList.add('stats__header');

        const headerText1 = document.createElement('span');
        headerText1.textContent = 'Projects';

        const headerText2 = document.createElement('span');
        headerText2.textContent = 'Open';

        statsHeader.append(headerText1, headerText2);
        statsWrapper.append(statsTitle, statsHeader);

        this.statsWidget = statsWrapper

        document.querySelector('main').appendChild(statsWrapper);

        for (const project of projects){
        const stats = document.createElement('div');
        stats.classList.add('stats');

        const statsName = document.createElement('span');
        statsName.className = 'stats__name';
        statsName.textContent = project.name;

        const statsCount = document.createElement('span');
        statsCount.className ='stats__count';
        statsCount.textContent = project.tasks.filter(el => el.done === false).length

        stats.append(statsName, statsCount);
        this.statsWidget.appendChild(stats);
        }
    }
    clear(){
        this.statsWidget.remove()
    }
}