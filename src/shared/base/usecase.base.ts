export abstract class UseCaseBase<Req, Res> {
  abstract execute(request?: Req): Promise<Res> | Res;
}
