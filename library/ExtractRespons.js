const SUCCESS_MESSAGE = 'success process request';
const CODE_ERROR_INTERNAL = 400;
const CODE_SUCCESS = 200;

function extractResponPesan(res) {
  try {
    const { name } = res.addPesanan.result;
    const splitted = name.split('/');
    return {
      code: CODE_SUCCESS,
      data: {
        id_pesanan: splitted[splitted.length - 1],
      },
      message: SUCCESS_MESSAGE,
    };
  } catch (error) {
    return {
      code: CODE_ERROR_INTERNAL,
      message: JSON.stringify(error),
    };
  }
}

export default extractResponPesan;
