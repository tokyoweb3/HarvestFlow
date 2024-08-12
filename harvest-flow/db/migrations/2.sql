-- recall: migrations need to be repackaged with `npm run pack` when changed
-- todo: replace https://github.com/PaimaStudios/paima-engine/issues/414
WITH new_ticks AS (
  INSERT INTO scheduled_data (block_height, input_data )
  VALUES (
    -- get the latest block + 1
    coalesce((
      SELECT block_height
      FROM block_heights
      ORDER BY block_height DESC
      LIMIT 1
    ), 0) + 2,
    'calcPoints|0'
  )
  RETURNING id
)
INSERT INTO scheduled_data_precompile (id, precompile)
SELECT id, 'pointsCalculation'
FROM new_ticks
