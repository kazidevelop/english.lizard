import { SeeRoutingModule } from './see-routing.module';

describe('SeeRoutingModule', () => {
  let seeRoutingModule: SeeRoutingModule;

  beforeEach(() => {
    seeRoutingModule = new SeeRoutingModule();
  });

  it('should create an instance', () => {
    expect(seeRoutingModule).toBeTruthy();
  });
});
