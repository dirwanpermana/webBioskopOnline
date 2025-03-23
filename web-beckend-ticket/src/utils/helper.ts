export const getAssetUrl = (path = "thumbnails") => {
	const appurl = process.env.APP_URL ?? "";

	return `${appurl}/uploads/${path}/`;
};
