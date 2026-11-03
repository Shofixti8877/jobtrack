import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';

import { ApplicationEntity } from './application.entity.js';
import { ApplicationsService } from './applications.service.js';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  const repositoryMock = {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        {
          provide: getRepositoryToken(ApplicationEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(ApplicationsService);
  });

  describe('findAll', () => {
    describe('create', () => {
      it('creates and saves a new application', async () => {
        const input = {
          company: 'Via',
          position: 'Frontend Engineer',
          status: 'applied' as const,
          location: 'Tel Aviv',
        };

        const createdApplication: ApplicationEntity = {
          id: '123',
          company: 'Via',
          position: 'Frontend Engineer',
          status: 'applied',
          appliedAt: '2026-11-03',
          location: 'Tel Aviv',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        repositoryMock.create.mockReturnValue(createdApplication);
        repositoryMock.save.mockResolvedValue(createdApplication);

        const result = await service.create(input);

        expect(repositoryMock.create).toHaveBeenCalledOnce();
        expect(repositoryMock.save).toHaveBeenCalledWith(createdApplication);

        expect(result).toEqual(createdApplication);
      });
    });

    it('returns all applications from the repository', async () => {
      const applications: ApplicationEntity[] = [
        {
          id: '1',
          company: 'Via',
          position: 'Frontend Engineer',
          status: 'applied',
          appliedAt: '2026-11-01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      repositoryMock.find.mockResolvedValue(applications);

      const result = await service.findAll();

      expect(repositoryMock.find).toHaveBeenCalledOnce();
      expect(result).toEqual(applications);
    });
  });

  describe('findOne', () => {
    it('returns an application by id', async () => {
      const application: ApplicationEntity = {
        id: '123',
        company: 'Via',
        position: 'Frontend Engineer',
        status: 'applied',
        appliedAt: '2026-11-03',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.findOne.mockResolvedValue(application);

      const result = await service.findOne('123');

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: {
          id: '123',
        },
      });

      expect(result).toEqual(application);
    });

    it('throws NotFoundException when application does not exist', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('updates and saves an existing application', async () => {
      const existingApplication: ApplicationEntity = {
        id: '123',
        company: 'Via',
        position: 'Frontend Engineer',
        status: 'applied',
        appliedAt: '2026-11-03',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.findOne.mockResolvedValue(existingApplication);

      repositoryMock.save.mockImplementation(
        async (application) => application,
      );

      const result = await service.update('123', {
        status: 'offer',
        notes: 'Offer received',
      });

      expect(repositoryMock.save).toHaveBeenCalledOnce();

      expect(result.status).toBe('offer');
      expect(result.notes).toBe('Offer received');
    });
  });

  describe('remove', () => {
    it('removes an existing application', async () => {
      const application: ApplicationEntity = {
        id: '123',
        company: 'Via',
        position: 'Frontend Engineer',
        status: 'applied',
        appliedAt: '2026-11-03',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.findOne.mockResolvedValue(application);
      repositoryMock.remove.mockResolvedValue(application);

      const result = await service.remove('123');

      expect(repositoryMock.remove).toHaveBeenCalledWith(application);

      expect(result).toEqual(application);
    });
  });
});
