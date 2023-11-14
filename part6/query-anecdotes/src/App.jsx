import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes } from "./utils/requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { updateAnecdote } from "./utils/requests";

const App = () => {

  const queryClient = useQueryClient();

  const handleVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log(`voted for ${anecdote.id} with ${anecdote.votes} votes`);
    handleVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  };


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
