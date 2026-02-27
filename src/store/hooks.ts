import { useDispatch, useSelector } from 'react-redux'
import { store } from './index'
import type { RootState } from './index'

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
