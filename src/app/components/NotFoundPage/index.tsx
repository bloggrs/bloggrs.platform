import * as React from 'react';
import styled from 'styled-components/macro';
import { P } from './P';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <>
      <Helmet
        defaultTitle="404 Page Not Found"
        meta={[
          {
            name: "description",
            content: "Page not found",
          },
        ]}
      />
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😥
          </span>
          4
        </Title>
        <P>The page you're looking for doesn't exist.</P>
        <StyledButton onClick={() => window.history.back()}>
          Go Back
        </StyledButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const Title = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
  color: #1e4d7b;
  font-size: clamp(2.5rem, 8vw, 4rem);

  span {
    font-size: 0.9em;
  }
`;

const StyledButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background-color: #1e4d7b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #163a5f;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem;
  }
`;
