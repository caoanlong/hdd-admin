import routersData from '../src/assets/data/routers.json'

export let saveRouterDB = (function () {
	// console.log(JSON.stringify(routersData))
	localStorage.setItem('routersData', JSON.stringify(routersData))
})()

export let getRouterDB = () => {
	return JSON.parse(localStorage.getItem('routersData'))
}