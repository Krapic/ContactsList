import { ConstrainMode, DetailsList, DetailsListLayoutMode, SelectionMode, Spinner } from '@fluentui/react';
import React, { useEffect, useState } from 'react';

interface WeatherForecast
{
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}

export default function FetchData() {
  const [data, setData] = useState<WeatherForecast[]>();

  useEffect(() => {
    populateData();
  }, [])

  async function populateData() {    
    const response = await fetch('weatherforecast');
    const responseData = await response.json() as WeatherForecast[];
    setData(responseData);
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <DetailsList 
      items={data}
      columns={[
        {
          key: 'date',
          fieldName: 'date',
          name: 'Date',
          minWidth: 200,
          onRender: (item) => new Date(item.date).toLocaleString()
        },
        {
          key: 'temperatureC',
          fieldName: 'temperatureC',
          name: 'Temperature (C)',
          minWidth: 200,
        },
        {
          key: 'temperatureF',
          fieldName: 'temperatureF',
          name: 'Temperature (F)',
          minWidth: 200,
        },
        {
          key: 'summary',
          fieldName: 'summary',
          name: 'Summary',
          minWidth: 200,
        },
      ]}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      constrainMode={ConstrainMode.unconstrained}
      selectionMode={SelectionMode.none}
    />
  );
}
