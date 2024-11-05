import { MAX_MESSAGES } from '@/mock/chat'
import { ListRenderItem, FlatListProps } from 'react-native'
import Animated, {
  FadeInDown,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'

type TikTokMessagesProps<T> = FlatListProps<T> & {
  renderItem: ListRenderItem<T>
}

function AnimatedItem({ index, children }: { index: number; children: React.ReactNode }) {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, { damping: 80, stiffness: 200 })
  })

  const styleZ = useAnimatedStyle(() => {
    return {
      opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGES]),
    }
  })

  return (
    <Animated.View
      entering={FadeInDown.springify()
        .damping(80)
        .stiffness(200)
        .withInitialValues({
          transform: [{ translateY: 100 }],
          opacity: 0,
        })}
    >
      <Animated.View style={styleZ}>{children}</Animated.View>
    </Animated.View>
  )
}

export default function TiktokMessages<T>({ renderItem, ...rest }: TikTokMessagesProps<T>) {
  return (
    <Animated.FlatList
      inverted
      itemLayoutAnimation={LinearTransition.springify().damping(80).stiffness(200)}
      {...rest}
      renderItem={(props) => {
        return <AnimatedItem index={props.index}>{renderItem(props)}</AnimatedItem>
      }}
    ></Animated.FlatList>
  )
}
