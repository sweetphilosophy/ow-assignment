import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return it', () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        roles: ['ADMIN'],
        groups: ['GROUP_1'],
      };
      const newUser = service.create(createUserDto);

      expect(newUser).toBeDefined();
      expect(newUser.name).toEqual(createUserDto.name);
    });
  });

  describe('update', () => {
    it('should update an existing user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'test',
        roles: ['ADMIN'],
        groups: ['GROUP_1'],
      };
      const updatedUser = service.update(1, updateUserDto);

      expect(updatedUser).toBeDefined();
    });

    it('should throw NotFoundException for a non-existent user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'test',
        roles: ['ADMIN'],
        groups: ['GROUP_1'],
      };

      expect(() => {
        service.update(999, updateUserDto);
      }).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an existing user', () => {
      const initialCount = service.findAll().length;
      service.delete(1);

      expect(service.findAll().length).toBeLessThan(initialCount);
    });

    it('should throw NotFoundException for a non-existent user', () => {
      expect(() => {
        service.delete(999);
      }).toThrow(NotFoundException);
    });
  });

  describe('findManagedUsers', () => {
    it('should return managed users for an admin user', () => {
      const managedUsers = service.findManagedUsers(1);

      expect(managedUsers).toBeDefined();
    });

    it('should return an empty array for a non-admin user', () => {
      const managedUsers = service.findManagedUsers(999);

      expect(managedUsers).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a user for a valid ID', () => {
      const user = service.findById(1);

      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
    });

    it('should throw NotFoundException for a non-existent user ID', () => {
      expect(() => {
        service.findById(999);
      }).toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const users = service.findAll();

      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBe(6);
    });
  });
});
