import { useContext, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Anchor, Text } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';
import ApolloDataContext from '../ApolloDataProvider/context';
import BarSegment from './BarSegment';
import IconWrapper from '../IconWrapper';

export default function PaginationBar() {
  const { searchReleases } = useContext(ApolloDataContext);
  const { query } = useRouter();

  const activeBarPage = useCallback(() => Math.floor((query.page - 1) / 10), [
    query.page
  ]);

  const [pageBarIndex, setPageBarIndex] = useState(activeBarPage());

  useEffect(
    () => {
      setPageBarIndex(activeBarPage());
    },
    [activeBarPage]
  );

  if (!searchReleases) return null;

  const {
    pagination: { page, pages }
  } = searchReleases;

  if (pages === 1) return null;

  const pageBars = [];

  for (let i = 0; i < pages; i += 1) {
    const isActive = i + 1 === page;
    // const showTooltip = i % 10 === 0;
    const showTooltip = true;
    const first = i % 10 === 0;
    const last = i % 10 === 9 || i + 1 === pages;

    const barIndex = Math.floor(i / 10);
    if (!pageBars[barIndex]) {
      pageBars.push([]);
    }

    pageBars[barIndex].push(
      <Link
        key={i}
        href={{ pathname: '/explorer', query: { ...query, page: i + 1 } }}
      >
        <Anchor style={{ height: '100%' }}>
          <BarSegment
            label={i + 1}
            isActive={isActive}
            first={first}
            last={last}
            showTooltip={showTooltip}
          />
        </Anchor>
      </Link>
    );
  }

  return (
    <Box
      fill="vertical"
      direction="column"
      align="center"
      justify="center"
      gap="0.5rem"
      pad="0.3rem"
      margin={{ vertical: '0.3rem' }}
    >
      <Box
      // style={{
      //   writingMode: 'vertical-rl',
      //   textOrientation: 'mixed'
      //   // transform: 'rotate(180deg)'
      // }}
      >
        <Text textAlign="center" size="0.8rem">
          PAGES
        </Text>
      </Box>
      <IconWrapper
        onClick={() => setPageBarIndex(v => v + 1)}
        disabled={pageBarIndex === pageBars.length - 1}
      >
        <FormNext />
      </IconWrapper>

      <Box as="ul" fill="vertical" direction="column">
        {pageBars[pageBarIndex]}
      </Box>

      <IconWrapper
        onClick={() => setPageBarIndex(v => v - 1)}
        disabled={pageBarIndex === 0}
      >
        <FormPrevious />
      </IconWrapper>
    </Box>
  );
}
