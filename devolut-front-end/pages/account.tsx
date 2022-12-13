import { getSession, signOut, useSession } from "next-auth/react";
import {
  Box,
  ScaleFade,
} from '@chakra-ui/react';
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";

export default function Account() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <ScaleFade initialScale={0.9} in={true}>
      <Box
        width={'full'}
        maxWidth={{ base: 'xl', md: '7xl' }}
        marginInline={'auto'}
        paddingInlineStart={{ base: '6', md: '8' }}
        paddingInlineEnd={{ base: '6', md: '8' }}
      >
        <Header session={session} router={router} signOut={signOut} />

        
        <Footer />
      </Box>
    </ScaleFade>
    </>
  );
}

export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}