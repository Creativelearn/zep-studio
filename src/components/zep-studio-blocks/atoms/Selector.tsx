import styled from '@emotion/styled';
import { HTMLMotionProps, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { selectorState } from '../../../store/selectorState';
import { Portal } from '../../Portal';

export type SelectItem = {
  title: string;
  value: string;
  description: string;
};

export const SelectorWrapper = styled.div`
  position: relative;
  display: flex;

  position: relative;
`;

type Props = Omit<HTMLMotionProps<'div'>, 'onSelect'> & {
  type?: 'primary' | 'secondary';
  items?: SelectItem[];
  onSelect?: (value: string) => void;
  onDismiss: () => void;
};

export const Selector: React.FC<Props> = ({
  type = 'primary',
  items = [],
  onSelect,
  onDismiss,
  ...props
}) => {
  const [offsets, setOffsets] = useState<{ top: number; left: number } | null>(
    null,
  );
  const placeholderRef = useRef<HTMLDivElement>(null);

  const uuid = useMemo(() => uuidv4(), []);
  const isUUIDInitializedRef = useRef<boolean>(false);
  const [currentSelector, setCurrentSelector] = useRecoilState(selectorState);

  useEffect(() => {
    setCurrentSelector(uuid);
    setTimeout(() => {
      isUUIDInitializedRef.current = true;
    });
  }, [setCurrentSelector, uuid]);

  useEffect(() => {
    if (!isUUIDInitializedRef.current) {
      return;
    }
    if (currentSelector !== uuid) {
      onDismiss();
    }
  }, [currentSelector, onDismiss, setCurrentSelector, uuid]);

  useEffect(() => {
    if (!placeholderRef.current) {
      return;
    }
    const parent = (findDOMNode(placeholderRef.current)?.parentNode ||
      null) as HTMLElement | null;

    if (!parent) {
      return;
    }

    setOffsets({
      top: (parent?.getBoundingClientRect().top ?? 0) + 43 + 8,
      left: parent?.getBoundingClientRect().left ?? 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholderRef]);

  return (
    <>
      <div ref={placeholderRef} />
      <Portal id="selector-portal">
        <Container
          initial={{ opacity: 0, transform: 'translateY(8px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(-8px)' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          {...props}
          style={{ ...offsets }}
        >
          {items.map((item) => (
            <SelectItemContainer
              key={item.value}
              onClick={() => {
                onSelect?.(item.value);
                setCurrentSelector(null);
              }}
            >
              <SelectItemName>
                <span
                  className={
                    type === 'primary' ? 'circle-purple' : 'circle-blue'
                  }
                >
                  •
                </span>{' '}
                {item.title}
              </SelectItemName>
              <SelectItemDescription>{item.description}</SelectItemDescription>
            </SelectItemContainer>
          ))}

          <BottomSpacer />
        </Container>
      </Portal>
    </>
  );
};

const Container = styled(motion.div)`
  position: absolute;
  z-index: 99;

  width: 395px;
  height: fit-content;
  max-height: 584px;
  overflow-y: scroll;

  /* Shadow/box02 */

  filter: drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.1));

  /* Auto layout */

  display: flex;
  flex-direction: column;

  padding: ${36 - 14.5}px 12px 0px 28px;
  gap: 10px;

  /* gray/00 */

  background: #ffffff;
  /* gray/02 */

  border-left: 2px solid #e3e7ec;
  border-radius: 10px;
`;

const SelectItemContainer = styled.div`
  margin: 14.5px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
`;

const SelectItemName = styled.span`
  /* body/01-bold */

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: 0.0125em;
  text-align: left;

  /* main/03 */

  color: #262a2e;

  .circle-purple {
    color: #8077f2;
  }

  .circle-blue {
    color: #74c1d9;
  }
`;
const SelectItemDescription = styled.span`
  /* body/02 */

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-align: left;

  /* gray/04 */

  color: #7e8992;
`;

const BottomSpacer = styled.div`
  width: 100%;
  height: ${36 - 14.5}px;
`;
