import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockUsersService = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findManagedUsers: jest.fn(),
  findAll: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call UsersService.create with CreateUserDto', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        roles: ['ADMIN'],
        groups: ['GROUP_1'],
      };
      controller.create(createUserDto);

      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should call UsersService.update with id and UpdateUserDto', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'test',
        roles: ['ADMIN'],
        groups: ['GROUP_1'],
      };
      const userId = 1;
      controller.update(userId, updateUserDto);

      expect(mockUsersService.update).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
    });
  });

  describe('delete', () => {
    it('should call UsersService.delete with id', async () => {
      const userId = 1;
      controller.delete(userId);

      expect(mockUsersService.delete).toHaveBeenCalledWith(userId);
    });
  });

  describe('findManaged', () => {
    it('should call UsersService.findManagedUsers with id', async () => {
      const userId = 1;
      controller.findManaged(userId);

      expect(mockUsersService.findManagedUsers).toHaveBeenCalledWith(userId);
    });
  });

  describe('findAll', () => {
    it('should call UsersService.findAll', async () => {
      controller.findAll();

      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });
});
