// ユースケースの型
export type IUseCase<Input, Output> = (input: Input) => Promise<Output>;

// ユースケースのFactoryの型
export type IUseCaseFactory<DataAccess, UseCase extends IUseCase<any, any>> = (
  dataAccess: DataAccess
) => UseCase;
