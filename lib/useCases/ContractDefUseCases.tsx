import IContractDefinition from '../domain/entities/IContractDefinition';
import ContractDefRepository from '../domain/repositories/ContractDefRepository';
import AbstractUseCases from './AbstractUseCases';

export default class ContractDefUseCases extends AbstractUseCases<
  IContractDefinition,
  ContractDefRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): ContractDefRepository {
    return new ContractDefRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): IContractDefinition {
    return {
      name: object.name as string,
      description: object.description as string,
      timeAmount: object.timeAmount as string,
      timeType: object.timeType as string,
      termsConditions: object.termsConditions as string,
      state: object.state as string
    };
  }

  async listActives(): Promise<IContractDefinition[]> {
    return (this.repository as ContractDefRepository).listActives();
  }

  async create(
    unknownObj: Record<string, unknown>
  ): Promise<IContractDefinition> {
    const activeState = (
      this.repository as ContractDefRepository
    ).getActiveState();

    const leaseContract = {
      ...unknownObj,
      state: activeState
    };

    return super.create(leaseContract);
  }
}
