import React from 'react';

import { firestoredb, storage } from '../../../lib';
import handleFirebaseError from '../../../utils/general/handleFirebaseError';
import { toast } from 'react-toastify';

import { Container, Options } from './styles';
import { Container as PostContainer, Text, Media } from '../../Post/styles';
import { Contents, Exception } from '../..';
import { Author, InnerCenteredContainer } from '../../../global/styles';

import DefaultPicture from '../../../assets/default-picture.png';

import { Group, Post } from '../../../global/types';

interface Props {
  group: Group;
  setGroup: (group: Group | null) => void;
}

const PostRequests: React.FC<Props> = ({ group, setGroup }) => {
  
  const refusePost = async (post: Post) => {
    try {
      const groupCopy: Group = JSON.parse(JSON.stringify(group));
      const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);

      const postIndex = groupCopy.requests.postsToPublish.findIndex(
        reqPost => reqPost.id === post.id
      );
      groupCopy.requests.postsToPublish.splice(postIndex, 1);
      
      if(post.media.images.length) {
        for (let imgIndex in post.media.images) {
          const storageRef = storage.ref(
            storage.storage,
            `posts/groups/${post.id}/images/${imgIndex}`
          );
          await storage.deleteObject(storageRef);
        }
      }
      if(post.media.videos.length) {
        for (let vidIndex in post.media.videos) {
          const storageRef = storage.ref(
            storage.storage,
            `posts/groups/${post.id}/videos/${vidIndex}`
          );
          await storage.deleteObject(storageRef);
        }
      }
      if (post.media.docs.length) {
        for (let docIndex in post.media.docs) {
          const storageRef = storage.ref(
            storage.storage,
            `posts/groups/${post.id}/docs/${docIndex}`
          );
          await storage.deleteObject(storageRef);
        }
      }

      await firestoredb.updateDoc(groupRef, {
        requests: groupCopy.requests,
      });
      setGroup(groupCopy);
      toast('Post refused!');
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const acceptPost = async (post: Post) => {
    try {
      const groupCopy: Group = JSON.parse(JSON.stringify(group));
      const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);

      const postIndex = groupCopy.requests.postsToPublish.findIndex(
        reqPost => reqPost.id === post.id
      );
      groupCopy.requests.postsToPublish.splice(postIndex, 1);
      groupCopy.posts.push(post.id);

      await firestoredb.setDoc(
        firestoredb.doc(firestoredb.db, `media/posts/groups`, post.id),
        post
      );
      await firestoredb.updateDoc(groupRef, {
        posts: groupCopy.posts,
        requests: groupCopy.requests,
      });
      setGroup(groupCopy);
      toast('Post accepted!');
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  if (!group.requests.postsToPublish.length) {
    return (
      <InnerCenteredContainer>
        <Exception message={'No post requests to see!'} />
      </InnerCenteredContainer>
    );
  }
  return (
    <Container>
      {group.requests.postsToPublish.map(post => (
        <PostContainer key={post.id}>
          <Author>
            <div>
              <img
                src={post.author.picture ? post.author.picture : DefaultPicture}
                alt={post.author.name}
              />
            </div>
            <div className="name">
              <h2>{post.author.name}</h2>
            </div>
          </Author>
          <Text>
            <p>{post.content}</p>
          </Text>
          <Media>
            <Contents item={post} />
          </Media>
          <Options>
            <button className="refuse" onClick={() => refusePost(post)}>
              Refuse post
            </button>
            <button className="accept" onClick={() => acceptPost(post)}>
              Accept post
            </button>
          </Options>
        </PostContainer>
      ))}
    </Container>
  );
};

export default PostRequests;
