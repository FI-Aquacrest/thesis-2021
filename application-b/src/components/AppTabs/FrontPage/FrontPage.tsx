import React from 'react';
import { Avatar, Card, CardContent, Grid } from '@mui/material';
import styled from '@emotion/styled';

interface BlogPost {
  id: number,
  author: string,
  title: string,
  content: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    author: 'Some Guy',
    title: 'Emptiness',
    content: 'Am I the only one here...?'
  },
];

const Home = () => {
  const EllipsisText = styled.section`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `;

  return (
    <Grid container direction="row" spacing={3}>
      {blogPosts.map((blogPost: BlogPost) => (
        <Grid key={blogPost.id} item xs={12} sm={6} md={4}>
          <Card style={{ backgroundColor: '#ffaeae', height: 170 }}>
            <CardContent>
              <EllipsisText style={{
                marginBottom: 15,
                height: 30,
                fontWeight: 'bold'
              }}>
                {blogPost.title}
              </EllipsisText>
              <EllipsisText style={{
                height: 30
              }}>
                {blogPost.content}
              </EllipsisText>
              <Grid container direction="row" style={{
                marginTop: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Grid item xs={2}>
                  <Avatar>
                    {blogPost.author[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  <EllipsisText>
                    {blogPost.author}
                  </EllipsisText>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
