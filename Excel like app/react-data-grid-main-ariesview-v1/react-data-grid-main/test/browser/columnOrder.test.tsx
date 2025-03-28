import { page } from '@vitest/browser/context';

import { DataGrid, SelectColumn, TreeDataGrid } from '../../src';
import type { Column } from '../../src';
import { getHeaderCells } from './utils';

const frozen1: Column<unknown> = {
  key: 'f1',
  name: 'frz1',
  frozen: true
};

const frozen2: Column<unknown> = {
  key: 'f2',
  name: 'frz2',
  frozen: true
};

const standard1: Column<unknown> = {
  key: 's1',
  name: 'std1'
};

const standard2: Column<unknown> = {
  key: 's2',
  name: 'std2'
};

test('column order', () => {
  const rows: readonly unknown[] = [];

  function run(columns: readonly Column<unknown>[]) {
    let unmount;
    if (groupBy === undefined) {
      ({ unmount } = page.render(<DataGrid columns={columns} rows={rows} />));
    } else {
      ({ unmount } = page.render(
        <TreeDataGrid
          columns={columns}
          rows={rows}
          groupBy={groupBy}
          rowGrouper={() => ({})}
          expandedGroupIds={new Set()}
          onExpandedGroupIdsChange={() => {}}
        />
      ));
    }

    expect(getHeaderCells().map((c) => c.textContent)).toStrictEqual(expected);
    unmount();
  }

  let expected: readonly string[] = ['', 'frz1', 'frz2', 'std1', 'std2'];
  let groupBy: readonly string[] | undefined;

  run([SelectColumn, frozen1, frozen2, standard1, standard2]);
  run([standard1, standard2, SelectColumn, frozen1, frozen2]);
  run([standard1, standard2, frozen1, SelectColumn, frozen2]);
  run([standard1, frozen1, standard2, frozen2, SelectColumn]);

  expected = ['', 'std1', 'frz1', 'frz2', 'std2'];
  groupBy = ['s1'];

  run([SelectColumn, frozen1, frozen2, standard1, standard2]);
  run([standard1, standard2, SelectColumn, frozen1, frozen2]);
  run([standard1, standard2, frozen1, SelectColumn, frozen2]);
  run([standard1, frozen1, standard2, frozen2, SelectColumn]);

  expected = ['', 'std1', 'frz2', 'frz1', 'std2'];
  groupBy = ['s1', 'f2'];

  run([SelectColumn, frozen1, frozen2, standard1, standard2]);
  run([standard1, standard2, SelectColumn, frozen1, frozen2]);
  run([standard1, standard2, frozen1, SelectColumn, frozen2]);
  run([standard1, frozen1, standard2, frozen2, SelectColumn]);
});
