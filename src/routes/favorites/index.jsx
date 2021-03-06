import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import styled from 'styled-components';
import Ability from '../../components/ability';
import GenericModal from '../../components/genericModal';
import { Loading } from '../../components/loading';
import Stat from '../../components/stat';
import Service from '../../utils/services';
import Item from './Item';
import style from './style'

const Container = styled.div`
	max-width: 1000px;
	margin: auto;
`

const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	padding-bottom: 0;
`

const ModalTitle = styled.h1`
	text-transform: capitalize;
`

const PokemonImage = styled.div`
	height: 300px;
	width: 300px;
	img {
		max-height: 300px;
		max-width: 300px;
	}
`

const Section = styled.section`
	padding: 50px;

	@media (max-width: 1000px) {
		padding: 40px;
	}

	@media (max-width: 400px) {
		padding: 20px;
	}
	
	padding-top: 0;
`

const Title = styled.h1`
	font-weight: 100;
	text-align: center;
`

const Favorites = () => {

	const [ favorites ] = useState(JSON.parse(localStorage.getItem('favorites')))
	const [ details, setDetails ] = useState(undefined)
  const [ blob, setBlob ] = useState(undefined)

  const loadImage = useCallback(async () => {
    if (!details) return
    setBlob(await Service.getImageBlob(details.image))
  }, [details])

  useEffect(() => {
    loadImage()
  }, [loadImage])

	useEffect(() => {
		console.log(details)
	}, [details])

	return (
		<div class={style.favorites}>
			<Container>
				<h1>Favorites</h1>
				{favorites && [...favorites].reverse().map(f => 
					<Item pokemon={f} setDetails={setDetails} />
				)}
			</Container>
			{details &&
				<GenericModal open={!!details} closeFunction={() => setDetails(undefined)}>
					<ModalContainer>
						<PokemonImage>
							{blob ?
								<img src={blob}/> : 
								<Loading />
							}
						</PokemonImage>
						<ModalTitle>{details.name}</ModalTitle>
					</ModalContainer>
					<Section>
						<Title>Stats</Title>		
						{details.stats.map(stat => 
							<Stat stat={stat}/>
						)}
					</Section>
					<Section>
						<Title>Abilities</Title>		
						{details.abilities.map(ability => 
							<Ability ability={ability} />
						)}
					</Section>
				</GenericModal>
			}
		</div>
	);
}

export default Favorites;
