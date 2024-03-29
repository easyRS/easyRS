import { makeDelete, makePost, makePut } from './common';
import { ALL_CONTRACT_DEF_METHODS_ENDPOINT } from './constants';

const createContractDef = async (data: IEntity) => {
  await makePost(data, ALL_CONTRACT_DEF_METHODS_ENDPOINT);
};

const updateContractDef = async (data: IEntity) => {
  await makePut(data, ALL_CONTRACT_DEF_METHODS_ENDPOINT);
};

const deleteContractDef = async (data: IEntity) => {
  await makeDelete(data, ALL_CONTRACT_DEF_METHODS_ENDPOINT);
};

export default {
  createCallback: createContractDef,
  updateCallback: updateContractDef,
  deleteCallback: deleteContractDef
};
