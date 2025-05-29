import React from 'react'
import List from "../features/Lists"

const Home = () => {
  return (
    <>
    <main className='bg-white'>
      <article className=''>
        {/* section for list */}
        <section>
          <List/>
        </section>
      </article>

    </main>
      
    </>
  )
}

export default Home
