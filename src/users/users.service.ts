import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseObject, Role, User } from './types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly groups: Array<string> = ['GROUP_1', 'GROUP_2'];

  private readonly permissions: Array<string> = [
    'CREATE',
    'VIEW',
    'EDIT',
    'DELETE',
  ];

  private readonly roles: Array<Role> = [
    {
      name: 'Admin',
      code: 'ADMIN',
      permissions: [
        this.permissions[0],
        this.permissions[1],
        this.permissions[2],
        this.permissions[3],
      ],
    },

    { name: 'Personal', code: 'PERSONAL', permissions: [] },

    { name: 'Viewer', code: 'VIEWER', permissions: [this.permissions[1]] },
  ];

  private readonly users: Array<User> = [
    {
      id: 1,
      name: 'John Doe',
      roles: [this.roles[0], this.roles[1]],
      groups: [this.groups[0], this.groups[1]],
    },

    {
      id: 2,
      name: 'Grabriel Monroe',
      roles: [this.roles[1]],
      groups: [this.groups[0], this.groups[1]],
    },

    {
      id: 3,
      name: 'Alex Xavier',
      roles: [this.roles[1]],
      groups: [this.groups[1]],
    },

    {
      id: 4,
      name: 'Jarvis Khan',
      roles: [this.roles[0], this.roles[1]],
      groups: [this.groups[1]],
    },

    {
      id: 5,
      name: 'Martines Polok',
      roles: [this.roles[0], this.roles[1]],
      groups: [this.groups[0]],
    },

    {
      id: 6,
      name: 'Gabriela Wozniak',
      roles: [this.roles[2], this.roles[1]],
      groups: [this.groups[0]],
    },
  ];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.generateUserId(),
      groups: createUserDto.groups,
      roles: createUserDto.roles.map((roleDto) =>
        this.roles.find((role) => role.code === roleDto),
      ),
      name: createUserDto.name,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(userId: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[userIndex] = {
      id: this.users[userIndex].id,
      name: updateUserDto.name || this.users[userIndex].name,
      groups: updateUserDto.groups || this.users[userIndex].groups,
      roles:
        updateUserDto.roles.map((roleDto) =>
          this.roles.find((role) => role.code === roleDto),
        ) || this.users[userIndex].roles,
    };

    return this.users[userIndex];
  }

  delete(userId: number): ResponseObject {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
    return { status: 'ok', message: 'User successfully deleted' };
  }

  findManagedUsers(managerId: number): User[] {
    const manager = this.users.find((u) => u.id === managerId);

    if (!manager || !manager.roles.find((role) => role.code === 'ADMIN')) {
      return [];
    }

    return this.users.filter(
      (user) =>
        user.id !== managerId &&
        user.groups.some((group) => manager.groups.includes(group)),
    );
  }

  findById(userId: number): User {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    return this.users[userIndex];
  }

  findAll(): Array<User> {
    return this.users;
  }

  private generateUserId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
  }
}
