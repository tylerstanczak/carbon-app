import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';

const headers = [
  {
    key: 'prompt',
    header: 'Prompt'
  },
  {
    key: 'rouge',
    header: 'Rouge Score'
  }
];

export const OtherPrompts = ({ rows }) => {
  return (
    
  <Table aria-label="prompt table">
    <TableHead>
      <TableRow>
        {headers.map(row => {
          return (
            <TableHeader>{row.header}</TableHeader>
          )
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => {
        return (
          <TableRow>
            <TableCell>{row['Prompt']}</TableCell>
            <TableCell>{row['ROUGE-1 Score']}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  </Table>
  );
}