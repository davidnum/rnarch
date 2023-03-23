import { injectable } from 'inversify';

import { SomeReportDto } from '#features/some-report/data/dto';
import { SomeReportModel } from '#features/some-report/domain';

@injectable()
export class SomeReportDataMapper {
  public toModel(dto: SomeReportDto): SomeReportModel {
    return {
      text: dto.value,
    };
  }
}
