
router.get('/get/:id', async (ctx, next) => {
	let data = await Mysql.select(ctx.params.id);
	ctx.body = {
		code: 'success',
		data
	};
});