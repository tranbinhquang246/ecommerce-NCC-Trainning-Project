// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../api/axios';
// import { List, ListItem, Container } from './styles';
// import ExampleConponent from './components/ExampleConponent';
// import useLoading from '../../hooks/useLoading';

// export default function ExamplePage() {
//   const [posts, setPosts] = useState([]);

//   const [showLoading, hideLoading] = useLoading();

//   const getData = async () => {
//     try {
//       showLoading();
//       // const data = await axiosInstance.get('/example');
//       // if (data) {
//       //   setPosts(data);
//       // }
//     } catch (e) {
//       console.log(e);
//     } finally {
//       hideLoading();
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <Container>
//       <ExampleConponent />
//       <List>
//         {posts.map((item) => (
//           <ListItem key={`${item.id}`}>{item.title}</ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// }
