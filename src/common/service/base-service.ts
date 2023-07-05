import { Inject, Injectable } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  ModifyResult,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
  public model: Model<T>;
  constructor(public readonly modelParam: Model<T>) {
    this.model = modelParam;
  }

  findOne(
    conditions: FilterQuery<T>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ) {
    return this.model.findOne(
      conditions as FilterQuery<T>,
      projection,
      options,
    );
  }

  insertOne(data: Partial<Record<keyof T, unknown>>) {
    return this.model.create(data);;
  }

  find(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ) {
    return this.model.find(filter, projection, options);
  }

  count(
    filter?: FilterQuery<T>
  ) {
    return this.model.count(filter);
  }

  findById(
    id: any,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ) {
    return this.model.findById(id, projection, options);
  }

  findByIdAndUpdate(
    id: any,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  findOneAndUpdate(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ) {
    return this.model.findOneAndUpdate(conditions, update, options);
  }

  updateOne(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ) {
    return this.model.updateOne(conditions, update, options);
  }

  updateMany(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ) {
    return this.model.updateMany(conditions, update, options);
  }
}
