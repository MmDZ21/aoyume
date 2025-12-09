import React from 'react'
import AnimeBigCard from './AnimeBigCard'
import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/database.types'

type AnimeDetailsRow = Database["public"]["Views"]["complete_anime_details_materialized"]["Row"];

const BestOfWeek = async() => {
  const supabase = await createClient()
  
  const { data: anime } = await supabase
    .from("complete_anime_details_materialized")
    .select("*")
    .eq("season", "fall")
    .eq("seasonYear", 2025)
    .order("post_hit", { ascending: false })
    .limit(1)
    .single();

  if (!anime) return null;

  return (
    <AnimeBigCard anime={anime} />
  )
}

export default BestOfWeek