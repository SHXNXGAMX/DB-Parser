const AppDAO = require('./dao.js');

dao = new AppDAO();

(async () => {
	let oldData = [];

	const colors = [];
	const backgrounds = [];
	const banners = [];
	const badges = [];
	const mythicals = [];

	const items = [
		{
			table: 'colors',
			data: colors
		},
		{
			table: 'backgrounds',
			data: backgrounds
		},
		{
			table: 'banners',
			data: banners
		},
		{
			table: 'badges',
			data: badges
		},
		{
			table: 'mythicals',
			data: mythicals
		},
	];

	await dao.getOldAll().then(element => oldData = element);
	oldData.forEach(async (user) => {
		const json = JSON.parse(user.json);

		const data = [
			user.ID,
			json?.balance ?? 0,
			JSON.stringify(json?.color ?? json?.color1) ?? null,
			JSON.stringify(json?.background ?? json?.background1) ?? null,
			JSON.stringify(json?.banner ?? json?.banner1) ?? null,
			JSON.stringify(json?.badge ?? json?.badge1) ?? null,
			JSON.stringify(json?.mythical ?? json?.mythical1) ?? null
		]

		if (json?.color && json?.color != undefined && json?.color != []) {
			json?.color.forEach(item => colors.push(item));
		}
		if (json?.color1 && json?.color1 != undefined && json?.color1 != []) {
			json?.color1.forEach(item => colors.push(item));
		}
		if (json?.background && json?.background != undefined && json?.background != []) {
			json?.background.forEach(item => backgrounds.push(item));
		}
		if (json?.background1 && json?.background1 != undefined && json?.background1 != []) {
			json?.background1.forEach(item => backgrounds.push(item));
		}
		if (json?.banner && json?.banner != undefined && json?.banner != []) {
			json?.banner.forEach(item => banners.push(item));
		}
		if (json?.banner1 && json?.banner1 != undefined && json?.banner1 != []) {
			json?.banner1.forEach(item => banners.push(item));
		}
		if (json?.badge && json?.badge != undefined && json?.badge != []) {
			json?.badge.forEach(item => badges.push(item));
		}
		if (json?.badge1 && json?.badge1 != undefined && json?.badge1 != []) {
			json?.badge1.forEach(item => badges.push(item));
		}
		if (json?.mythical && json?.mythical != undefined && json?.mythical != []) {
			json?.mythical.forEach(item => mythicals.push(item));
		}
		if (json?.mythical1 && json?.mythical1 != undefined && json?.mythical1 != []) {
			json?.mythical1.forEach(item => mythicals.push(item));
		}

		await dao.postNewUser(data);
	});
	console.log(items);

	items.forEach(async item=>{
		item.data.forEach(async a=>{
			await dao.postNewItem(item.table, a);
		});
	});
})();