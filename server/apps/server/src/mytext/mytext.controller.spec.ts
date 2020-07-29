import { Test, TestingModule } from '@nestjs/testing';
import { MytextController } from './mytext.controller';

describe('Mytext Controller', () => {
  let controller: MytextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MytextController],
    }).compile();

    controller = module.get<MytextController>(MytextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
