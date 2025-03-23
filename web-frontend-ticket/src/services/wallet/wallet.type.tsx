// file ini merupakan response dari API history transaction yang di ubah ke type Typescript, dan akan di panggil di wallet service untuk endpoint

export interface WalletTransaction {
  _id: string;
  wallet: string;
  price: string;
  status: string;
}
// respon api walletTopup dari api topup Balance
export interface WalletTopup {
	token: string;
	redirect_url: string;
}
