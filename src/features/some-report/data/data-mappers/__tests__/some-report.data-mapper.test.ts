import { SomeReportDataMapper } from '#features/some-report/data/data-mappers';
import { SomeReportDto } from '#features/some-report/data/dto';

describe('SomeReportDataMapper', () => {
  it('should return an some-report model', () => {
    // arrange
    const dto: SomeReportDto = { value: 'some-report' };
    const dataMapper = new SomeReportDataMapper();

    // act
    const result = dataMapper.toModel(dto);

    // assert
    expect(result).toEqual({ text: 'some-report' });
  });
});
