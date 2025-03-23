// Generik type(T) yang jadikan parameter data yang berubah ubah
export type BaseResponse<T> = {
	message: string;
	data: T;
	status: string;
};
