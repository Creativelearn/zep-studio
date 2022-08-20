import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';

import Navigation from '../../components/Navigation';
import { ConditionEndBlock } from '../../components/zep-studio-blocks/ConditionEndBlock';
import { ConditionForkBlock } from '../../components/zep-studio-blocks/ConditionForkBlock';
import { ConditionForkList } from '../../components/zep-studio-blocks/ConditionForkList';
import { ConditionStartBlock } from '../../components/zep-studio-blocks/ConditionStartBlock';
import { TriggerBlock } from '../../components/zep-studio-blocks/TriggerBlock';
import { BasicActionBlock } from '../../components/zep-studio-blocks/actions/BasicActionBlock';
import { RepeatActionBlock } from '../../components/zep-studio-blocks/actions/RepeatActionBlock';

export const StudioPage: React.FC = () => {
  return (
    <main>
      <Navigation />
      <Box paddingTop="68px">
        <Flex h="100vh">
          <Stack w="full" h="full" padding="54px" bg={'gray.200'}>
            <BlockList>
              <TriggerBlock />
              <StrightArrow />
              <ConditionStartBlock />

              <ConditionForkList>
                <ConditionForkBlock satisfied>
                  <BasicActionBlock />
                </ConditionForkBlock>
                <ConditionForkBlock satisfied={false}>
                  <RepeatActionBlock>
                    <BasicActionBlock />
                    <BasicActionBlock />
                  </RepeatActionBlock>
                </ConditionForkBlock>
              </ConditionForkList>

              <ConditionEndBlock />
            </BlockList>
          </Stack>
          <Stack
            w="25vw"
            h="full"
            spacing={10}
            alignItems="flex-start"
            bg={'gray.600'}
          ></Stack>
        </Flex>
      </Box>
    </main>
  );
};

const BlockList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;

  /* & > * {
    z-index: 0;
  } */
`;

const StrightArrow: React.FC = () => (
  <StrightArrowContainer>
    <svg
      width="16"
      height="51"
      viewBox="0 0 16 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.29289 50.7071C7.68342 51.0976 8.31658 51.0976 8.70711 50.7071L15.0711 44.3431C15.4616 43.9526 15.4616 43.3195 15.0711 42.9289C14.6805 42.5384 14.0474 42.5384 13.6569 42.9289L8 48.5858L2.34315 42.9289C1.95262 42.5384 1.31946 42.5384 0.928932 42.9289C0.538408 43.3195 0.538408 43.9526 0.928932 44.3431L7.29289 50.7071ZM7 0V50H9V0H7Z"
        fill="#868E96"
      />
    </svg>
  </StrightArrowContainer>
);
const StrightArrowContainer = styled.div`
  padding: 4px 0;
  display: flex;
`;
