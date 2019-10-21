const update = require('immutability-helper');

const initialState = {
  current_id_pesanan: null,
  current_state_pesanan: null,
  screens: {},
  raw_data: {
    pesan: [],
  },
};

const wow = update(initialState, {
  current_id_pesanan: { $set: 'dsadsadsa' },
  current_state_pesanan: { $set: 'search' },
  raw_data: { pesan: { $set: {a:1 ,b:0} } },
});

console.log(wow)